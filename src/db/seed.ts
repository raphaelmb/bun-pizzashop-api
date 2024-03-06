import { faker } from "@faker-js/faker"
import { users, restaurants } from "./schema"
import { db } from "./connection"

// Reset database
await db.delete(users)
await db.delete(restaurants)

// Create customers
await db.insert(users).values([
    {
        name: faker.person.fullName(),
        email: faker.internet.email(), 
        role: "customer"
    },
    {
        name: faker.person.fullName(),
        email: faker.internet.email(), 
        role: "customer"
    },
])

// Create manager
const [ manager ] = await db.insert(users).values([
    {
        name: faker.person.fullName(),
        email: "admin@admin.com", 
        role: "manager"
    },
]).returning({
    id: users.id
})

// Create restaurant 
await db.insert(restaurants).values([
    {
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        managerId: manager.id
    },
])

console.log("Database seeded successfully.")

process.exit()