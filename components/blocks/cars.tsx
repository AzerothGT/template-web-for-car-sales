"use client";
import {
  PageBlocksCars,
  PageBlocksCarsItems,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export const Cars = ({ data }: { data: PageBlocksCars }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 data-tina-field={tinaField(data, 'title')} className="text-balance text-4xl font-semibold lg:text-5xl">
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className="mt-4 text-muted-foreground text-lg">
            {data.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.items &&
            data.items.map(function (car, i) {
              return <CarCard key={i} {...car!} />;
            })}
        </div>
      </div>
    </Section>
  );
};

const CarCard: React.FC<PageBlocksCarsItems> = (data) => {
  return (
    <Card className="group overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Car Image */}
      <div className="relative w-full h-64 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
        {data.image && (
          <Image
            data-tina-field={tinaField(data, "image")}
            src={data.image}
            alt={data.brand || "Car"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Overlay badge */}
        {data.badge && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {data.badge}
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Model */}
        <h3
          data-tina-field={tinaField(data, "model")}
          className="text-2xl font-bold mb-2 text-foreground"
        >
          {data.model}
        </h3>

        {/* Brand */}
        {data.brand && (
          <p
            data-tina-field={tinaField(data, "brand")}
            className="text-muted-foreground mb-4"
          >
            {data.brand}
          </p>
        )}

        {/* Specifications */}
        {data.specs && (
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
            {data.specs.split(',').map((spec, index) => (
              <span key={index} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-primary" />
                {spec.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Starting at</p>
          <p
            data-tina-field={tinaField(data, "price")}
            className="text-3xl font-bold text-primary"
          >
            {data.price}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        {/* Primary Action Button */}
        <Button
          asChild
          className="flex-1"
          data-tina-field={tinaField(data, "actionUrl")}
        >
          <Link href={data.actionUrl || "#"}>
            {data.actionLabel || "View Details"}
          </Link>
        </Button>

        {/* Secondary Action Button (optional) */}
        {data.secondaryActionUrl && (
          <Button
            asChild
            variant="outline"
            className="flex-1"
            data-tina-field={tinaField(data, "secondaryActionUrl")}
          >
            <Link href={data.secondaryActionUrl}>
              {data.secondaryActionLabel || "Test Drive"}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const defaultCar = {
  model: "S-Class Sedan",
  brand: "Mercedes-Benz",
  price: "$115,000",
  image: "/placeholder-car.jpg",
  badge: "New",
  specs: "V6 Turbo, 429 HP, AWD",
  actionLabel: "View Details",
  actionUrl: "#",
  secondaryActionLabel: "Test Drive",
  secondaryActionUrl: "#",
};

export const carsBlockSchema: Template = {
  name: "cars",
  label: "Cars Showcase",
  ui: {
    previewSrc: "/blocks/cars.png",
    defaultItem: {
      title: 'Our Premium Collection',
      description: 'Discover our exclusive range of luxury and performance vehicles',
      items: [defaultCar, defaultCar, defaultCar],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Car Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.model + (item?.brand ? ` - ${item.brand}` : ''),
          };
        },
        defaultItem: {
          ...defaultCar,
        },
      },
      fields: [
        {
          type: "image",
          label: "Car Image",
          name: "image",
        },
        {
          type: "string",
          label: "Model",
          name: "model",
        },
        {
          type: "string",
          label: "Brand",
          name: "brand",
        },
        {
          type: "string",
          label: "Price",
          name: "price",
        },
        {
          type: "string",
          label: "Badge (e.g., 'New', 'Featured')",
          name: "badge",
        },
        {
          type: "string",
          label: "Specifications (comma-separated)",
          name: "specs",
        },
        {
          type: "string",
          label: "Action Button Label",
          name: "actionLabel",
        },
        {
          type: "string",
          label: "Action Button URL",
          name: "actionUrl",
        },
        {
          type: "string",
          label: "Secondary Action Label (optional)",
          name: "secondaryActionLabel",
        },
        {
          type: "string",
          label: "Secondary Action URL (optional)",
          name: "secondaryActionUrl",
        },
      ],
    },
  ],
};
