import { IEntity } from "constructum-interfaces";
import React from "react";

// сделать загрузку данных проекта
// в контекст и отображать данные из контекста
// при изменении контекста передать данные 
// из контекста в api сервер на обновление данных
export interface ICurrentProjectContext {
    projectName: string
    entities: Array<IEntity>
    renameProject: (projectName: string) => void
    addEntity: (entity: IEntity) => void
    deleteEntity: (entity: IEntity) => void
}

export const CurrentProjectContext = React.createContext<ICurrentProjectContext>({
    projectName: "",
    entities: [],
    renameProject: () => { },
    addEntity: () => { },
    deleteEntity: () => { }
})