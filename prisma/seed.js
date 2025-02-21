const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 🟢 1. Clear Existing Data
  await prisma.review.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✅ Cleared existing data");

  // 🟢 2. Create Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Chairs" },
      { name: "Tables" },
      { name: "Sofas" },
      { name: "Beds" },
    ],
  });

  console.log("✅ Categories created");

  // Fetch categories
  const [chairs, tables, sofas, beds] = await prisma.category.findMany();

  // 🟢 3. Create Users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword1",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashedpassword2",
    },
  });

  console.log("✅ Users created");

  // 🟢 4. Create Products
  const product1 = await prisma.product.create({
    data: {
      name: "Ergonomic Office Chair",
      description: "Comfortable and stylish office chair.",
      price: 149.99,
      imageUrl: "https://example.com/office-chair.jpg",
      categoryId: chairs.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Wooden Dining Table",
      description: "Elegant wooden table for dining rooms.",
      price: 299.99,
      imageUrl: "https://example.com/dining-table.jpg",
      categoryId: tables.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Luxury Sofa",
      description: "Modern sofa with premium fabric.",
      price: 499.99,
      imageUrl: "https://example.com/luxury-sofa.jpg",
      categoryId: sofas.id,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "King Size Bed",
      description: "Spacious and comfortable king-sized bed.",
      price: 699.99,
      imageUrl: "https://example.com/king-bed.jpg",
      categoryId: beds.id,
    },
  });

  console.log("✅ Products created");

  // 🟢 5. Create Orders
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      totalAmount: 449.98,
      status: "paid",
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            price: 149.99,
          },
          {
            productId: product2.id,
            quantity: 1,
            price: 299.99,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      totalAmount: 1199.98,
      status: "shipped",
      items: {
        create: [
          {
            productId: product3.id,
            quantity: 1,
            price: 499.99,
          },
          {
            productId: product4.id,
            quantity: 1,
            price: 699.99,
          },
        ],
      },
    },
  });

  console.log("✅ Orders created");

  // 🟢 6. Create Cart Items
  await prisma.cartItem.createMany({
    data: [
      {
        userId: user1.id,
        productId: product3.id,
        quantity: 1,
      },
      {
        userId: user2.id,
        productId: product1.id,
        quantity: 2,
      },
    ],
  });

  console.log("✅ Cart Items created");

  // 🟢 7. Create Reviews
  await prisma.review.createMany({
    data: [
      {
        userId: user1.id,
        productId: product1.id,
        rating: 5,
        comment: "Best chair I have ever bought!",
      },
      {
        userId: user2.id,
        productId: product3.id,
        rating: 4,
        comment: "Sofa is amazing, but a bit expensive.",
      },
    ],
  });

  console.log("✅ Reviews created");

  // 🟢 8. Create Payments
  await prisma.payment.createMany({
    data: [
      {
        orderId: order1.id,
        method: "Credit Card",
        status: "completed",
      },
      {
        orderId: order2.id,
        method: "PayPal",
        status: "completed",
      },
    ],
  });

  console.log("✅ Payments created");

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
