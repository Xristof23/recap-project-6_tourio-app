import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();
  if (request.method === "GET") {
    const place = await Place.findById(id);
    response.status(200).json(place);
  }
  if (request.method === "PATCH") {
    const updatedPlace = request.body;
    await Place.findByIdAndUpdate(id, updatedPlace);
    response.status(200).json({ status: "Place successfully updated." });
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Place successfully deleted." });
  }
  // } else {
  //   return response.status(405).json({ message: "Method not allowed" });
  // }
}
