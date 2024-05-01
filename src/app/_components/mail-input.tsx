import { redirect } from "next/navigation";

import { Icon } from "~/components/ui/plus-icon";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { MousePointerClick } from "lucide-react";

interface LandingPageInputProps {
  children?: React.ReactNode;
  defaultMail: string;
  description?: boolean;
}

export default function MailInput({
  children,
  defaultMail,
  description,
}: LandingPageInputProps) {
  async function serverMailAction(formData: FormData) {
    "use server";
    const rawFormData = {
      mail: formData.get("mail"),
    };

    let mail = rawFormData.mail?.toString();
    if (mail) {
      mail = mail.split("@")[0];
      redirect(`/mail/${mail}`);
    }
  }

  return (
    <>
      <div className="bg-background relative flex w-full flex-col items-start border border-white/[0.2] p-4 ">
        <Icon className="absolute -left-3 -top-3 h-6 w-6 text-white " />
        <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-white " />
        <Icon className="absolute -right-3 -top-3 h-6 w-6 text-white " />
        <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-white " />
        <form
          action={serverMailAction}
          className="flex h-full w-full items-start justify-center"
        >
          <div className="flex w-full gap-1">
            <Input
              name="mail"
              defaultValue={defaultMail}
              type="email"
              className="grow"
            />
            <Button type="submit" variant="outline">
              <MousePointerClick />
            </Button>
            {children}
          </div>
        </form>
      </div>
      {description && (
        <div className="flex flex-col items-center justify-center gap-1 text-sm">
          Replace the email or stick with the random one.
          <div className="flex items-center gap-1">
            Click <MousePointerClick className="h-6 w-6" /> to get started.
          </div>
        </div>
      )}
    </>
  );
}