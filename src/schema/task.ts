export type TaskType = {
    id?: string;
    userId?: string;
    title: string;
    description: string;
    status: string;
    dateCreated: Date | string;
};
