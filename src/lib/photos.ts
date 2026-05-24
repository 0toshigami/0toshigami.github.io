import data from "../data/photos.json";

export type Photo = {
  id: string;
  thumb: string;
  full: string;
  width: number;
  height: number;
  blur: string;
};

export const photos: Photo[] = data as Photo[];

const byId = new Map(photos.map((p) => [p.id, p]));

export function getPhoto(id: string): Photo {
  const p = byId.get(id);
  if (!p) throw new Error(`Photo not found in manifest: ${id}`);
  return p;
}
