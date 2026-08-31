export type VehicleConfiguration = {
  slug: string;
  color?: string;
  variant?: string;
};

export function encodeVehicleConfiguration(configuration: VehicleConfiguration) {
  const params = new URLSearchParams();
  if (configuration.color) params.set('colour', configuration.color);
  if (configuration.variant) params.set('variant', configuration.variant);
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function configurationUrl(configuration: VehicleConfiguration) {
  return `/virtual-showroom/${configuration.slug}${encodeVehicleConfiguration(configuration)}`;
}
