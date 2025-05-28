import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function addRev() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({
    date: "",
    username: "",
    review: "",
    photos: [] as string[], // или File[]
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileURLs = files.map((f) => URL.createObjectURL(f)); // для превью
    setForm((prev) => ({ ...prev, photos: fileURLs }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviews((prev) => [...prev, form]);
    setForm({ date: "", username: "", review: "", photos: [] }); // reset
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Дата</Label>
          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Имя</Label>
          <Input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="review">Отзыв</Label>
          <Textarea name="review" value={form.review} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="photos">Фото</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotosChange}
          />
        </div>
        <Button type="submit">Добавить отзыв</Button>
      </form>

      <hr />

      <h3 className="text-lg font-semibold">Отзывы:</h3>
      <ul className="space-y-4">
        {reviews.map((rev, idx) => (
          <li key={idx} className="p-2 border rounded">
            <p>
              <strong>{rev.username}</strong> ({rev.date})
            </p>
            <p>{rev.review}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {rev.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Фото"
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
