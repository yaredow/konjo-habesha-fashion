import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Text,
  Container,
  Section,
  Preview,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactUsEmilProps = {
  name: string;
  message: string;
  senderEmail: string;
};

function ContactUsEmail({ message, senderEmail }: ContactUsEmilProps) {
  return (
    <Html>
      <Head>
        <Preview>New Contact Email</Preview>
        <Tailwind>
          <Body>
            <Container className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
              <Section>
                <Heading className="mb-4 text-2xl font-bold">
                  New Contact Email
                </Heading>
                <Text className="mb-4">{message}</Text>
                <Hr className="my-4 border-t border-gray-300" />
                <Text className="font-semibold">From:</Text>
                <Text className="text-sm">{senderEmail}</Text>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Head>
    </Html>
  );
}

export default ContactUsEmail;
