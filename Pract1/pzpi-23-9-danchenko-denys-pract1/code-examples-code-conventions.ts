
// 3.2 Використовуйте інтерфейси чи типи для опису структур даних

// Гарний приклад
interface User {
  id: number;
  name: string;
  email?: string;
}

function greet(user: User) {
  console.log(`Hello, ${user.name}`);
}

// Поганий приклад
function greetBad(user: any) {
  console.log(`Hello, ${user.name}`);
}


// 3.3 Уникайте дублювання коду

// Поганий приклад
function calculateAreaRectangle(width: number, height: number): number {
  return width * height;
}

function calculateAreaCircle(radius: number): number {
  return Math.PI * radius * radius;
}

function calculateAreaSquare(side: number): number {
  return side * side;
}

// Гарний приклад
type Shape =
  | { type: "rectangle"; width: number; height: number }
  | { type: "circle"; radius: number }
  | { type: "square"; side: number };

function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      throw new Error("Unknown shape type");
  }
}


// 3.4 Дотримуйтесь конвенцій іменування, чіткість та послідовність

// Поганий приклад
let A = "John";
const calc = (x: number, y: number) => x + y;
class person {
  constructor(public n: string) {}
}
interface iuser {
  id: number;
}

// Гарний приклад
let userName = "John";
const calculateSum = (x: number, y: number) => x + y;

class Person {
  constructor(public name: string) {}
}

interface IUser {
  id: number;
}

const MAX_ATTEMPTS = 3;


// 3.5 Типи та типізація. Створення безпечного коду

// Поганий приклад
function getTotalBad(price: any, tax: any): any {
  return price + tax;
}

let userBad: any;
userBad = "John";
userBad = 123; // змінюється тип без перевірки

// Гарний приклад
function getTotal(price: number, tax: number): number {
  return price + tax;
}

let userGood: string = "John";
// userGood = 123; // помилка компіляції

type UserRole = "admin" | "manager" | "client";
let role: UserRole = "admin";

// 3.6 Використовуйте зрозумілі назви

// Поганий приклад
function d(a: number, b: number): number {
  return a * b;
}

const arr = [1, 2, 3];
const t = new Date();

// Гарний приклад
function calculateRectangleArea(width: number, height: number): number {
  return width * height;
}

const userIds = [1, 2, 3];
const creationDate = new Date();


// 3.7 Розбивай код на зрозумілі блоки

function processUserData(user: User) {
  const isValid = validateUser(user);
  if (!isValid) throw new Error("Invalid user data");

  saveUserToDatabase(user);
  sendWelcomeEmail(user.email || "");
}

function validateUser(user: User): boolean {
  return Boolean(user.name && user.email);
}

function saveUserToDatabase(user: User) {
  console.log(`User ${user.name} saved to DB`);
}

function sendWelcomeEmail(email: string) {
  console.log(`Welcome email sent to ${email}`);
}

// Поганий приклад
function processUserDataBad(user: any) {
  if (!user.name || !user.email) {
    throw new Error("Invalid user data");
  }
  console.log(`User ${user.name} saved to DB`);
  console.log(`Welcome email sent to ${user.email}`);
}

// 3.8 Уникай надмірного проектування

// Гарний приклад
class UserSimple {
  constructor(public name: string) {}
}
const userSimple = new UserSimple("Denys");
console.log(userSimple.name);

// Поганий приклад
class UserFactory {
  static createUser(name: string) {
    return new UserSimple(name);
  }
}
const userFromFactory = UserFactory.createUser("Denys");
console.log(userFromFactory.name);

// 3.9 Будь послідовним

function fetchUserById(id: number): User {
  return { id, name: "Example User", email: "example@email.com" };
}

// Гарний приклад
function getUserData(id: number): User {
  try {
    const user = fetchUserById(id);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// Поганий приклад
function get_user(id: number) {
  try {
    let u = fetchUserById(id);
    return u;
  } catch (e) {
    console.log("Fetch fail", e);
  }
}

// 3.10 Використовуй ефективні структури даних

// Гарний приклад
const users = new Map<number, { id: number; name: string }>([
  [1, { id: 1, name: "Alice" }],
  [2, { id: 2, name: "Bob" }],
]);

function getUserById(id: number) {
  return users.get(id);
}

// Поганий приклад
const usersArray = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

function getUserByIdWrong(id: number) {
  return usersArray.find((user) => user.id === id);
}

// 3.11 Тестування (спрощена демонстрація)

// Гарний приклад
function calculateDiscount(price: number, discount: number): number {
  if (discount > price) throw new Error("Discount cannot exceed price");
  return price - discount;
}

// Поганий приклад
function calculateDiscountBad(price: number, discount: number): number {
  return price - discount; // не перевіряє крайові випадки
}

// 3.12 Використовуй умовні типи

// Гарний приклад
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Result1 = MyReturnType<() => string>; // string
type Result2 = MyReturnType<() => void>; // void

// Поганий приклад
type ManualStringReturn = string;
type ManualVoidReturn = void;

// 3.13 Використовуй узагальнені типи

// Гарний приклад
function createArray<T>(length: number, value: T): Array<T> {
  const result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

let names = createArray<string>(3, "Bob");
let numbers = createArray<number>(3, 0);

// Поганий приклад
function createStringArray(length: number, value: string): string[] {
  return Array(length).fill(value);
}

function createNumberArray(length: number, value: number): number[] {
  return Array(length).fill(value);
}

// 3.14 Використовуй простори імен

// Гарний приклад
namespace OrderModule {
  export class Order {
    constructor(public id: number, public customer: string) {}
  }

  export function cancelOrder(order: Order) {
    console.log(`Order ${order.id} cancelled.`);
  }

  export function processOrder(order: Order) {
    console.log(`Order ${order.id} processed for ${order.customer}.`);
  }
}

let order = new OrderModule.Order(1, "Denys");
OrderModule.processOrder(order);
OrderModule.cancelOrder(order);

// Поганий приклад
class Order {
  constructor(public id: number, public customer: string) {}
}

function cancelOrder(order: Order) {
  console.log(`Order ${order.id} cancelled.`);
}

function processOrder(order: Order) {
  console.log(`Order ${order.id} processed.`);
}

let order2 = new Order(2, "Gosha");
processOrder(order2);
cancelOrder(order2);
