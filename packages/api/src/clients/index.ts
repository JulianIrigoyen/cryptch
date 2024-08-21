import axios, { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";

// Zod schema for the expected response structure
const LikingUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
});

const TwitterLikingUsersResponseSchema = z.object({
  data: z.array(LikingUserSchema),
});

export type LikingUser = z.infer<typeof LikingUserSchema>;

class XClient {
  private apiClient: AxiosInstance;

  constructor(bearerToken: string) {
    this.apiClient = axios.create({
      baseURL: "https://api.twitter.com/2",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  }

  public async getLikingUsers(tweetId: string): Promise<LikingUser[]> {
    try {
      const response: AxiosResponse = await this.apiClient.get(`/tweets/${tweetId}/liking_users`);
      const parsedResponse = TwitterLikingUsersResponseSchema.parse(response.data);
      return parsedResponse.data;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.error("Invalid response format", error.errors);
        throw new Error("Invalid response format");
      } else {
        // Handle other errors (e.g., network issues, Twitter API errors)
        throw error;
      }
    }
  }
}

export default XClient;
