import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";

interface NewsletterEmailProps {
  firstName: string;
  unsubscribeUrl: string;
}

export default function NewsletterEmail({
  firstName,
  unsubscribeUrl,
}: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Latest updates from Konjo Habesha Fashion</Preview>
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
            <Text className="text-lg">Dear {firstName},</Text>
            <Text className="text-normal">
              Thank you for subscribing to the Konjo Habesha Fashion newsletter!
              We are excited to bring you the latest news and updates from our
              brand. Here are some highlights for you:
            </Text>
            <Section>
              <Text className="text-normal">
                - New collection launch next week!
              </Text>
              <Text className="text-normal">
                - Exclusive discounts for our subscribers.
              </Text>
              <Text className="text-normal">
                - Upcoming events and fashion shows.
              </Text>
            </Section>
            <Text className="text-normal">
              Stay tuned for more exciting updates and thank you for being a
              valued subscriber.
            </Text>
            <Text className="text-lg">
              Best regards,
              <br />
              The Konjo Habesha Team
            </Text>
            <Hr className="border-2" />
            <Text className="text-normal bg-background/20">
              Addis Ababa, Shiromeda
            </Text>
            <Section className="mt-4 text-center">
              <Button
                className="rounded-md bg-red-500 px-4 py-[10px] text-white"
                href={unsubscribeUrl}
              >
                Unsubscribe
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
