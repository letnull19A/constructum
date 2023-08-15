import { IFieldBuilder } from "./IFieldBuilder"

export interface IEntityBuilder {
    getName(): string
    getFields(): Array<IFieldBuilder>
}