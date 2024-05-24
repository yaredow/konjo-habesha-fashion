import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Row,
  Hr,
  Column,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";
import { OrderItemsType } from "../../types/order";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { formatName } from "@/utils/formatName";

interface OrderConfirmationEmailProps {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItemsType[];
  totalAmount: number;
}

export default function OrderConfirmationEmail({
  customerName,
  orderNumber,
  orderDate,
  items,
  totalAmount,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Order Confirmation</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="items-center rounded-lg border border-gray-300 p-4 shadow-lg">
            <Img
              src="https://res.cloudinary.com/diqgie9yt/image/upload/v1716035067/konjo-habesha/logo_ktkdhl.png"
              width="50"
              height="50"
              alt="Konjo Habesha Fashion Logo"
              className="mx-auto flex items-center justify-center"
            />
            <Text className="text-lg">Order Confirmation</Text>
            <Text className="text-normal">Dear {customerName},</Text>
            <Text className="text-normal">
              Thank you for your order! We&apos;re excited to let you know that
              your order has been successfully placed. Here are the details of
              your purchase:
            </Text>
            <Section className="mt-4">
              <Text className="text-normal">
                <strong>Order Number:</strong> {orderNumber}
              </Text>
              <Text className="text-normal">
                <strong>Order Date:</strong> {formatDate(orderDate)}
              </Text>
            </Section>
            <Section className="mt-4">
              <Row className="border-b">
                <Column className="px-4 py-2 text-left font-bold">Item</Column>
                <Column className="px-4 py-2 text-left font-bold">
                  Quantity
                </Column>
                <Column className="px-4 py-2 text-left font-bold">Price</Column>
              </Row>
              {items.map((item, index) => (
                <Row key={index} className="border-t">
                  <Column className="px-4 py-2">{formatName(item.name)}</Column>
                  <Column className="px-4 py-2">{item.quantity}</Column>
                  <Column className="px-4 py-2">
                    ${formatCurrency(item.price.toFixed(2))}
                  </Column>
                </Row>
              ))}
            </Section>
            <Section className="mt-4 text-right">
              <Text className="text-normal">
                <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
              </Text>
            </Section>
            <Text className="text-normal mt-4">
              You will receive another email once your order has been shipped.
            </Text>
            <Text className="mt-4 text-lg">
              Best regards,
              <br />
              The Konjo Habesha Team
            </Text>
            <Hr className="mt-4 border-2" />
            <Text className="text-normal bg-background/20">
              Addis Ababa, Shiromeda
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
