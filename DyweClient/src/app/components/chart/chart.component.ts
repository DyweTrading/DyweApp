import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Candle } from 'app/interfaces/candle';
import { CandlesService } from 'app/services/candles/candles.service';
import { createChart, CrosshairMode } from 'lightweight-charts';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('chart') chartEl!: ElementRef; // Получаем ссылку на элемент чарта

  @Input() currentPath: string = ''; // Получаем текущий роут
  @Input('currentTradePair') currentTradePairProps: string = ''; // Получаем текущую торговую пару
  private currentTimeFrame: string = '5m'; // Устанавливаем текущий тайм-фрейм

  private conn: WebSocket | undefined; // Для веб-сокета
  private intervalId: any; // Для интервалных запросов

  public candles: Candle[] = []; // Массив свечей
  public resizeObserver: ResizeObserver | undefined; // Для ресайза чарта
  public chart: any; // Для либы
  public candlestickSeries: any; // Для либы

  public chartOptions: any = {
    layout: {
      textColor: '#f6f4eb',
      background: { type: 'solid', color: '#00000a' },
    },
    grid: {
      vertLines: {
        color: 'rgba(256, 256, 256, 0.1)',
      },
      horzLines: {
        color: 'rgba(256, 256, 256, 0.1)',
      },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    priceScale: {
      borderColor: '#485c7b',
    },
    timeScale: {
      borderColor: '#485158',
      timeVisible: true,
      secondVisible: false,
    },
  };

  constructor(private _candlesService: CandlesService) {}

  ngOnInit() {
    if (this.currentPath === 'jettons') {
      // Проверяем, если сейчас у нас токены, то устанавливаем подключение
      this.initializeWebSocket(
        this.currentTradePairProps,
        this.currentTimeFrame
      );
    }

    this.fetchData(); // Парсим дату
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Если меняется текущая торгоавя пара или роут, переподключаем веб-сокет и снова получаем данные
    if (
      (changes['currentTradePairProps'] &&
        !changes['currentTradePairProps'].firstChange) ||
      (changes['currentPath'] && !changes['currentPath'].firstChange)
    ) {
      this.fetchData();

      if (this.currentPath === 'jettons') {
        // Проверяем, если сейчас у нас токены, то устанавливаем подключение
        this.initializeWebSocket(
          this.currentTradePairProps,
          this.currentTimeFrame
        );
      }

      if (this.currentPath === 'nft') {
        // Проверяем, если сейчас у нас NFT, то устанавливаем интервальные запросы

        // Очищаем предыдущий интервал, если он уже установлен
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }

        // Устанавливаем новый интервал
        this.intervalId = setInterval(() => {
          this.fetchCandles();
        }, 2000);
      }
    }
  }

  private fetchData() {
    // Функция для получения даты
    this._candlesService
      .getDataHistory(
        this.currentPath,
        this.currentTradePairProps,
        this.currentTimeFrame
      )
      .subscribe({
        next: (res) => {
          let candlesData;

          if (this.currentPath === 'jettons') {
            // Для токенов
            candlesData = res.map((candle: any) => ({
              time: candle[0] / 1000,
              open: Number(candle[1]),
              high: Number(candle[2]),
              low: Number(candle[3]),
              close: Number(candle[4]),
            }));
          } else if (this.currentPath === 'nft') {
            // Для NFT
            const resdata = JSON.parse(JSON.stringify(res));
            candlesData = resdata.map((candle: any) => ({
              time: candle[0] / 1000,
              open: candle[3],
              high: candle[4],
              low: candle[5],
              close: candle[6],
            }));
          }

          this.candlestickSeries.setData(candlesData);
        },
        error: (error) => {
          console.error('Ошибка при получении данных о криптовалюте:', error);
        },
      });
  }

  ngAfterViewInit(): void {
    this.initializeChart(); // Инициализация чарта
  }
  private fetchCandles() {
    // Функция для получения свечей под NFT
    this._candlesService
      .getCandles(this.currentTradePairProps, this.currentTimeFrame)
      .subscribe({
        next: (res: Candle) => {
          const editLiveData = {
            time: Number(res.openTime) / 1000,
            open: Number(res.open),
            high: Number(res.high),
            low: Number(res.low),
            close: Number(res.close || res.open),
          };

          console.log('NFT-candles Update =>', editLiveData);

          // Обновляем график
          this.candlestickSeries.update(editLiveData);
        },
        error: (error) => {
          console.error('Ошибка при получении данных о свечах:', error);
        },
        complete: () => {
          console.log('Получение данных о свечах завершено.');
        },
      });
  }

  private initializeChart() {
    // Функция инициализации чарта
    if (this.chartEl) {
      this.chart = createChart(this.chartEl.nativeElement, this.chartOptions);
      this.candlestickSeries = this.chart.addCandlestickSeries({
        upColor: '#bcfd4c',
        downColor: '#fd4c4c',
        borderDownColor: 'rgba(253, 76, 76, 0.8)',
        borderUpColor: '#698e2f',
        wickDownColor: 'rgba(253, 76, 76, 0.8)',
        wickUpColor: '#698e2f',
      });
      this.candlestickSeries.setData(this.candles);
      this.resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        this.chart.applyOptions({ width, height });
        setTimeout(() => {
          this.chart.timeScale().fitContent();
        }, 0);
      });
      this.resizeObserver.observe(this.chartEl.nativeElement);
    }
  }

  private initializeWebSocket(tradePair: string, currentTimeFrame: string) {
    if (this.conn) {
      this.conn.close(); // Закрываем предыдущее подключение перед созданием нового
    }

    const wsUrl = this._candlesService.GetLiveCandle(
      tradePair,
      currentTimeFrame
    );
    this.conn = new WebSocket(wsUrl);

    this.conn.onmessage = (event) => {
      const liveData = JSON.parse(event.data);
      const editLiveData = {
        time: liveData.k.t / 1000,
        open: parseFloat(liveData.k.o),
        high: parseFloat(liveData.k.h),
        low: parseFloat(liveData.k.l),
        close: parseFloat(liveData.k.c),
      };
      this.candlestickSeries.update(editLiveData);
    };

    this.conn.onopen = () => {
      console.log('WebSocket connection opened');
    };

    this.conn.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.conn.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.conn) {
      this.conn.close();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
