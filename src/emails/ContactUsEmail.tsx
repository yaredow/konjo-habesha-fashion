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
        <Preview>New contact email</Preview>
        <Tailwind>
          <Body>
            <Container>
              <Section>
                <Heading>You recived a contact email</Heading>
                <Text>{message}</Text>
                <Hr />
                <Text>{senderEmail}</Text>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Head>
    </Html>
  );
}

export default ContactUsEmail;
