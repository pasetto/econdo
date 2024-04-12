export interface GroupMember {
    id:        string   
    groupId:   string
    userId:    string
    friendId:  string
    createdAt: Date
    updatedAt: Date
}

export interface GroupMemberCreate {
    groupId: string
    name:    string
    email:   string
    phone:   string
}

export interface GroupMemberUpdate{
    id?: string
    groupId?: string
    userId?:  string
    friendId?: string
}
  
export interface GroupMemberRepository {
    create({groupId, userId}): Promise<any>;
    // findAll(): Promise<GroupMember[]>;
    findById(id: string): Promise<GroupMember[] | null>;
    findByUserId(id: string): Promise<GroupMember[] | null>;
    update(id: string, data: GroupMemberUpdate): Promise<GroupMember>;
    delete(id: string): Promise<boolean>;
    isUserInGroup(userId: string, groupId: string): Promise<boolean>;
}
  