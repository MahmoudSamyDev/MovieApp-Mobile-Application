import { Movie, TrendingMovie } from "@/interfaces/interfaces";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

const appwriteClient = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const db = new Databases(appwriteClient);

export async function updateSearchCounter(query: string, movie: Movie) {
  try {
    // Check if the document with the given query already exists
    const existingDocument = await db.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal("search", query),
    ]);

    // If it exists in the database, update search analytics
    if (existingDocument.documents.length > 0) {
      const existingMovie = existingDocument.documents[0];

      await db.updateDocument(DB_ID, COLLECTION_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      // If it doesn't exist, create a new document for new analytics later
      await db.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        search: query,
        count: 1,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search counter:", error);
  }
}

export async function getTrendingMovies(): Promise<
  TrendingMovie[] | undefined
> {
  try {
    const trendingMovies = await db.listDocuments(DB_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return trendingMovies.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return undefined;
  }
}
