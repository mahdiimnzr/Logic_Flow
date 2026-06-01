import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useI18n } from "@/i18n/useI18n";

const DrawerComponents = ({
  trigger,
  contentClassName,
  headerClassName,
  footerClassName,
  primitiveClassName,
  children,
  footer,
}) => {
  const { lang } = useI18n();
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent
        dir={lang === "en" ? "ltr" : "rtl"}
        className={contentClassName}
        primitiveClassName={primitiveClassName}
      >
        <DrawerHeader className={headerClassName}>{children}</DrawerHeader>
        <DrawerFooter className={footerClassName}>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponents;
