import { PrismaClient } from "@prisma/client";
import { profile } from "console";
const prisma = new PrismaClient();//to connect with database
async function createUser() {
  const newUser = await prisma.user.create({//create user
    data: {
      name: "zalla",
      email: "chamso@example.cm",
      password: "password123",
    },
  });
  console.log(newUser);
}
async function createPost() {
  const newPost = await prisma.post.create({//create post
    data: {
      content: "how are you",
      author: { connect: { id: "97f81741-229d-417f-9ce6-8e960c36d6b2" } },//add user id to the post as foreign key
    },
  });
  console.log(newPost);
}
async function findUserById() {
  const user = await prisma.user.findFirst({
    where: { name: "zalla" },//find the user with name zalla
    include: { posts: true },//parallel query to search all posts off this user
  });
  console.log(user)
}
async function createUserForProfile() {
  try {
    const newUser = await prisma.user.create({ data: { email: "@mail.com" } });//create user
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
}
async function createUserWithProfile() {
  try {
    const newUserWithProfile = await prisma.user.create({
      data: {
        email: "@esi.dz",
        profile: { create: { content: "hello world" } },//create user with profile in same time
      },
      include: { profile: true },
    });
    console.log(newUserWithProfile);
  } catch (error) {
    console.log(error);
  }
}
async function findUserWithProfile() {
  try {
    const users = await prisma.user.findMany({ include: { profile: true } });//find users with their profile parallel query
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}
async function findProfileWithUser() {
  try {
    const profile = await prisma.profile.findMany({//find profile with their user (inverse)
      include: { author: true },
    });
    console.log(profile);
  } catch (error) {
    console.log(error);
  }
}
//createUserWithProfile()
async function deleteUserWithProfile() {
  try {
    const newUser = await prisma.user.delete({//delete user with his profile in same time
      where: { id: "4bd77634-2bb4-4830-acf2-f15adde72f48" },
      include: { profile: true },
    });
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
}
async function updateUserWithProfile() {
  try {
    const updateUser = await prisma.user.update({
      where: { id: "1f465b9b-ceef-42bb-90c1-aade2dfb6c34" },
      data: { email: "@kk.com", profile: { delete: true } }, //only update and create can access to the data but delete not
    });
    console.log(updateUser);
  } catch (error) {
    console.log(error);
  }
}
async function queryCondition() {
  const user = await prisma.user.findFirst({
    where: {
      AND: [
        { id: "1f465b9b-ceef-42bb-90c1-aade2dfb6c34" },//AND condition
        { email: "@kk.com" },
      ],
    },
  });
  console.log(user);
}
async function queryCondition2() {
  const user = await prisma.user.findFirst({
    where: {
      id: "1f465b9b-ceef-42bb-90c1-aade2dfb6c34",
      email: "@kk.com",//the same result off end but this has big performance
    },
  });
  console.log(user);
}
async function profileQuery() {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: "4a4a5c2e-e035-4841-8953-3fc9ce5b9b8d",
        profile: { content: "hello world" },//search a user and add condition to the profile
      },
      include: { profile: true },
    });
    console.log(user)
  } catch (error) {
    console.log(error);
  }
}
async function profileMatchQuery():Promise<void>{
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: "4a4a5c2e-e035-4841-8953-3fc9ce5b9b8d",
        profile: { content: {contains : "hello"}},//any content contain hello it will work
      },
      include: { profile: true },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
profileMatchQuery()