import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

const DrawerComponents = ({
  trigger,
  contentClassName,
  headerClassName,
  footerClassName,
  primitiveClassName,
  children,
  footer,
}) => {
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent
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
