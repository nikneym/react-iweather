import BrandLogo from "./svg/BrandLogo";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center py-12">
      <BrandLogo className="flex-shrink-0" />
    </div>
  );
}
