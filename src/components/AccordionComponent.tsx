import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionComponent() {
  return (
    <div className="flex mx-auto w-1/2 py-10">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I purchase a course?</AccordionTrigger>
          <AccordionContent>
            You can browse our course catalog, select the course you&apos;re
            interested in, and click the &quot;Buy Now&quot; button. Follow the prompts to
            complete the payment process, and the course will be added to your
            account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            What payment methods are accepted?
          </AccordionTrigger>
          <AccordionContent>
            We accept major credit cards, PayPal, and other popular payment
            methods. Specific options will be available at the checkout page.
            Additionally, we provide you with some learning points on creating
            an account initially, so you can easily purchase the course you want
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Can I preview a course before purchasing?
          </AccordionTrigger>
          <AccordionContent>
            Yes, most of our courses offer free preview lessons. You can watch
            these sample lessons to get a feel for the course content and
            teaching style before making a purchase.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Will I receive a certificate upon completing a course?
          </AccordionTrigger>
          <AccordionContent>
            Yes, upon successfully completing a course, you will receive a
            digital certificate of completion. This can be downloaded and shared
            on your professional networks.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            How long do I have access to the course after purchase?
          </AccordionTrigger>
          <AccordionContent>
            Once you purchase a course, you will have lifetime access to the
            content. You can revisit the material anytime at your convenience.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
