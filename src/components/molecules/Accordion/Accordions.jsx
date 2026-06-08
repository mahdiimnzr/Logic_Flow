import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionMultiple = ({
  trigger,
  children,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
  value,
  defaultValue = value,
}) => {
  return (
    <Accordion
      type="multiple"
      className={className}
      defaultValue={[defaultValue]}
    >
      <AccordionItem value={value} className={itemClassName} defaultValue>
        <AccordionTrigger className={triggerClassName}>
          {trigger}
        </AccordionTrigger>
        <AccordionContent className={contentClassName}>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionMultiple;
