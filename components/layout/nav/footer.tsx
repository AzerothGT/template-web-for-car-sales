"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  // Use footer logo if available, otherwise fallback to header
  const logoImage = footer?.logoImage || header?.logoImage;
  const logoIcon = footer?.icon || header?.icon;
  const logoColor = footer?.color || header?.color;
  const footerName = footer?.name || header?.name;
  const menuColumns = footer?.menuColumns || [];

  return (
    <footer className="border-b dark:bg-transparent" style={{ backgroundColor: '#2d2d2d' }}>
      <div className="mx-auto max-w-7xl px-6">

        {/* Multi-column menu */}
        {menuColumns.length > 0 && (
          <div className="py-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {menuColumns.map((column: any, colIndex: number) => (
              <div key={colIndex}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {(column.links || []).map((link: any, linkIndex: number) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href || "/"}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Bottom bar: logo + social */}
        <div className="flex flex-wrap items-center gap-6 border-t border-gray-600 py-6 flex-col md:flex-row md:justify-between">

          <div className="order-last flex justify-center md:order-first md:justify-start">
            <Link href="/" aria-label="go home">
              {logoImage ? (
                <Image
                  src={logoImage}
                  alt={footerName || "Logo"}
                  width={80}
                  height={80}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <Icon
                  parentColor={logoColor!}
                  data={logoIcon}
                />
              )}
            </Link>
            <span className="self-center text-gray-200 text-sm ml-2">© {new Date().getFullYear()} {footerName}, All rights reserved</span>
          </div>

          <div className="order-first flex justify-center gap-6 text-sm md:order-last md:justify-end">
            {footer?.social?.map((link, index) => (
              <Link key={`${link!.icon}${index}`} href={link!.url!} target="_blank" rel="noopener noreferrer" >
                <Icon data={{ ...link!.icon, size: 'small' }} className="text-white hover:text-primary block" />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
