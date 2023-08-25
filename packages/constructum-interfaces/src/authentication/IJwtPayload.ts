/**
 * @description Полезные данные для генерации JWT токенов
 * @member id - id пользователя
 * @member name - имя пользователя
 * @member email - email пользователя
 * @member surname - фамилия пользователя
 * @member nickname - nickname пользователя
 * @example 
 * {
 *    id: '507f1f77bcf86cd799439011',
 *    name: 'Alex',
 *    email: 'my-email@mail.domain',
 *    surname: 'Volkov',
 *    nickname: 'letnull19a'
 * }
*/
export interface IJwtPayload {
    id: string
    name: string
    email: string
    surname: string
    nickname: string
  }