export interface Group {
    id: string;
    name: string;
    drawnDate: Date;
    deliveryDate: Date;
    deliveryPlace: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    status?: string;
    users?: object[];
}

export interface GroupCreate {
    name: string;
    drawnDate: Date;
    deliveryDate: Date;
    deliveryPlace: string;
    authorId?: string;
    status?: string;
}
  
export interface GroupRepository {
    create(data: GroupCreate): Promise<Group>;
    findAll(): Promise<Group[]>;
    findMeAll(): Promise<Group[]>;
    findById(id: string): Promise<Group | null>;
    update(id: string, data: GroupCreate): Promise<Group>;
    delete(id: string): Promise<boolean>;
}
  