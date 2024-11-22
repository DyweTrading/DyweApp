/*
  favorite.service

  - предназначен для базового управление "Избранными" торговыми парами
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private arrayFavorites: string[] = []; // Массив в который будут загружаться избранные торговые пары

  constructor() {
    this.loadFavoritesFromLocalStorage(); // Загружаем торговые пары
  }

  public setFavoriteTradePair(tradePairName: string) {
    // Функция обонвления списка торговых пар
    if (!this.arrayFavorites.includes(tradePairName)) {
      this.arrayFavorites.push(tradePairName);
    } else {
      this.arrayFavorites = this.arrayFavorites.filter(
        (pair) => pair !== tradePairName
      );
    }
    this.saveFavoritesToLocalStorage(); // Сохраняем обновление
  }

  public isFavorite(tradePairName: string): boolean {
    // Проверка на то, является ли торговая пара избранной
    return this.arrayFavorites.includes(tradePairName);
  }

  public getFavoriteTradePairs(): string[] {
    // Функция получения избранных торговых пар
    return this.arrayFavorites;
  }

  private loadFavoritesFromLocalStorage() {
    // Загрузка избранных торговых пар
    const savedFavorites = localStorage.getItem('favoriteTradePair');
    this.arrayFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  }

  private saveFavoritesToLocalStorage() {
    // Сохранение избранных торговых пар
    localStorage.setItem(
      'favoriteTradePair',
      JSON.stringify(this.arrayFavorites)
    );
  }
}
