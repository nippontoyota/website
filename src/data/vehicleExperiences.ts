export type VehicleExperience = {
  modelSlug: string;
  sourceUrl: string;
  sourceLabel: string;
};

const nipponVirtualShowroom = 'https://www.nippon-toyota.com/virtual-showroom';

const experienceSlugs: Record<string, string> = {
  glanza: 'glanza.html',
  'urban-cruiser-taisor': 'urbancruisertaisor.html',
  'urban-cruiser-hyryder': 'urbancruiserhyryder.html',
  'urban-cruiser-ebella': 'urbancruiserebella.html',
  'innova-crysta': 'innovacrysta.html',
  'innova-hycross': 'innova.html',
  hilux: 'hilux.html',
  fortuner: 'fortuner.html',
  legender: 'legender.html',
  camry: 'camry.html',
  vellfire: 'vellfire.html',
  'land-cruiser-300': 'lc300.html',
  rumion: 'rumion.html',
};

export const vehicleExperiences: Record<string, VehicleExperience> = Object.fromEntries(
  Object.entries(experienceSlugs).map(([modelSlug, experienceSlug]) => [
    modelSlug,
    {
      modelSlug,
      sourceUrl: `${nipponVirtualShowroom}/${experienceSlug}`,
      sourceLabel: 'Nippon Toyota 3D experience',
    },
  ]),
);

export function experienceForVehicle(modelSlug: string) {
  return vehicleExperiences[modelSlug];
}
