import { useState } from "react";
import { FaImage } from "react-icons/fa";
import DatePicker from "react-multi-date-picker";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function AddTourPackage() {
  const [durationDays, setDurationDays] = useState("");
  const [durationNights, setDurationNights] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hotelImageUrl, setHotelImageUrl] = useState("");
  const [activityImageUrl, setActivityImageUrl] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    country: "",
    city: "",
    map: "",
    duration: "",
    available_dates: "",
    per_person: "",
    min_people: "",
    discount_percent: "",
    image: "",
    inclusions: "",
    exclusions: "",
    hotel_name: "",
    rating: "",
    room_type: "",
    photos: "",
    activity_name: "",
    activity_photo: "",
  });

  const [itinerary, setItinerary] = useState([
    { day: 1, title: "", description: "", photo: "" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItineraryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItinerary = [...itinerary];
    updatedItinerary[index][name] = value;
    setItinerary(updatedItinerary);
  };

  const addItineraryDay = () => {
    setItinerary([
      ...itinerary,
      { day: itinerary.length + 1, title: "", description: "", photo: "" },
    ]);
  };

  // Add image upload function for multiple images
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );
      const data = await response.json();
      if (data.success) {
        const uploadedUrl = data.data.url;

        if (type === "main") {
          setImageUrl(uploadedUrl);
          setFormData((prev) => ({ ...prev, image: uploadedUrl }));
        } else if (type === "hotelPhotos") {
          setHotelImageUrl(uploadedUrl);
          setFormData((prev) => ({ ...prev, photos: uploadedUrl }));
        } else if (type === "itineraryPhoto") {
          setActivityImageUrl(uploadedUrl);
          setFormData((prev) => ({ ...prev, photo: uploadedUrl }));
        } else if (type === "activity") {
          setActivityImageUrl(uploadedUrl);
          setFormData((prev) => ({ ...prev, activity_photo: uploadedUrl }));
        }

        console.log("Image uploaded:", uploadedUrl);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      title: formData.title,
      overview: formData.overview,
      destination: {
        country: formData.country,
        city: formData.city,
        map: formData.map,
      },
      duration: `${durationDays} Days / ${durationNights} Nights`,
      available_dates: selectedDates.map((date) => date.format("YYYY-MM-DD")),
      price: {
        currency: "USD",
        per_person: Number(formData.per_person),
        group_discount: {
          min_people: Number(formData.min_people),
          discount_percent: Number(formData.discount_percent),
        },
      },
      image: formData.image,
      itinerary: itinerary,
      inclusions: formData.inclusions.split(",").map((item) => item.trim()),
      exclusions: formData.exclusions.split(",").map((item) => item.trim()),
      accommodation: {
        hotel_name: formData.hotel_name,
        rating: Number(formData.rating),
        room_type: formData.room_type,
        photos: [formData.photos],
      },
      activities: [
        {
          name: formData.activity_name,
          photo: formData.activity_photo,
        },
      ],
    };

    console.log("Submitted Data:", finalData);
    // You can post finalData using fetch/axios here
    axiosPublic
      .post("/tourPackage", finalData)
      .then((res) => {
        toast.success("TourPackage added Successfully");
        e.target.reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="p-6 rounded-2xl mt-6 w-10/12 mx-auto my-20">
      <h1 className="text-primary text-3xl text-center font-semibold my-10">
        Add Tour Package
      </h1>
      <form onSubmit={handleSubmit} className="grid gap-4 shadow-md p-10">
        <p className="text-xl">Tour Image</p>
        <div className="flex items-center">
          <p className="text-2xl rounded-full bg-gray-200 p-2 text-gray-600  mr-2 items-center ">
            <FaImage />
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "main")}
            className="file-input file-input-ghost border-gray-100"
            required
          />
        </div>
        <input
          name="title"
          placeholder="Package Title(Safari: 4-Day Luxury)"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="overview"
          placeholder="Overview"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <div className="flex gap-5 justify-between">
          <input
            name="country"
            placeholder="Country"
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="map"
            placeholder="Google Map Link"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex gap-5 justify-between">
          <div className="w-full">
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              required
              className="border p-2 rounded w-full"
            >
              <option value="">Select Days</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} Day{i > 0 && "s"}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              value={durationNights}
              onChange={(e) => setDurationNights(e.target.value)}
              required
              className="border p-2 rounded w-full"
            >
              <option value="">Select Nights</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} Night{i > 0 && "s"}
                </option>
              ))}
            </select>
          </div>
          <div className=" w-full">
            <DatePicker
              multiple
              value={selectedDates}
              onChange={setSelectedDates}
              placeholder="Select Dates"
              format="YYYY-MM-DD"
              containerClassName="datepicker-container w-full"
            />
          </div>
        </div>

        <div className="flex justify-between gap-5">
          <input
            name="per_person"
            type="number"
            placeholder="Price per person (USD)"
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="min_people"
            type="number"
            placeholder="Min people for discount"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="discount_percent"
            type="number"
            placeholder="Discount Percent"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <textarea
          name="inclusions"
          placeholder="Inclusions (comma separated)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="exclusions"
          placeholder="Exclusions (comma separated)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <h2 className="text-xl font-semibold mt-4 mb-2">Accommodation</h2>
        <div className="flex gap-5 justify-between">
          <div>
            <span>Hotel Name:</span>
            <input
              name="hotel_name"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <span>Rating:</span>
            <input
              name="rating"
              type="number"
              step="0.1"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <span>Room Type:</span>
            <input
              name="room_type"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <div>
            <span>Hotel Photo:</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "hotelPhotos")}
              className="file-input file-input-ghost"
              required
            />
          </div>
        </div>

        {/* Dynamic Itinerary Fields */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Itinerary</h2>
        {itinerary.map((dayItem, index) => (
          <div key={index} className="border p-4 rounded mb-4 bg-gray-50">
            <h3 className="text-lg mb-2">Day {dayItem.day}</h3>
            <input
              name="title"
              placeholder="Title"
              value={dayItem.title}
              onChange={(e) => handleItineraryChange(index, e)}
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={dayItem.description}
              onChange={(e) => handleItineraryChange(index, e)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "itineraryPhoto")}
              className="file-input file-input-ghost border-gray-200"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addItineraryDay}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Day
        </button>

        <h2 className="text-xl font-semibold mt-4 mb-2">Activities</h2>
        <input
          name="activity_name"
          placeholder="Activity Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "activity")}
          className="file-input file-input-ghost border-gray-100"
          required
        />

        <div className="flex space-x-3 mt-8 justify-end">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-neutral">
            Submit Package
          </button>
        </div>
      </form>
    </div>
  );
}
