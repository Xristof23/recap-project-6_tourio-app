import Place from "@/db/models/Place";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    console.log(places);
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);
      response.status(201).json({ status: "Place created." });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
