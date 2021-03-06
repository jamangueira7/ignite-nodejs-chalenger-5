import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {

    const games = await this.repository
      .createQueryBuilder('games')
      .where('title ILIKE :params', { params: `%${param}%`})
      .getMany();// Complete usando query builder
    
    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const count = await this.repository.query('SELECT COUNT(*) FROM games'); // Complete usando raw query

    return count;
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    const users = await this.repository
      .createQueryBuilder()
      .relation(Game, 'users')
      .of(id)
      .loadMany();// Complete usando query builder
    
    return users;
  }
}
