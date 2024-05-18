import CardWrapper from "@/components/auth/CardWrapper";
import ContactUsForm from "@/components/forms/ContactUsForm";

function page() {
  return (
    <main className="my-auto flex min-h-[85vh] items-center justify-center">
      <CardWrapper
        title="Contact us"
        description="   Have a question or need assistance? Feel free to reach out to us
            using the form below. We're here to help!"
        isLogin={false}
        showSocial={false}
        backButtonHref="/"
        backButtonLabel="Go back to home"
      >
        <ContactUsForm />
      </CardWrapper>
    </main>
  );
}

export default page;
