export interface SavePort<T> {
  save(entity: T): Promise<boolean>;
}

export interface DeletePort<T> {
  delete(entity: T): Promise<T>;
}

export interface FindOne<T> {
  findOne(entity: { id?: string; email?: string }): Promise<T>;
}

export interface RepositoryPort<T>
  extends SavePort<T>,
    DeletePort<T>,
    FindOne<T> {}
