import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useI18n } from "@/i18n/useI18n";

const DrawerComponents = ({
  trigger,
  contentClassName,
  footerClassName,
  primitiveClassName,
  children,
  footer,
  direction = "bottom",
}) => {
  const { lang } = useI18n();
  return (
    <Drawer direction={direction}>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent
        dir={lang === "en" ? "ltr" : "rtl"}
        className={contentClassName}
        primitiveClassName={primitiveClassName}
      >
        {children}
        <DrawerFooter className={footerClassName}>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponents;
