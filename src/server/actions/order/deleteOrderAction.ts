"use server";

import prisma from "@/lib/prisma";

export async function deleteOrderAction(id: string) {
  try {
    await prisma.order.delete({ where: { id } });

    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) {
      return { success: true, message: "Order is deleted successfully" };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
