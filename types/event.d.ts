interface PetMoment {
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
  id: string;
  pet_event_photos: {
    id: string;
    photo_url: string;
  }[];
}
