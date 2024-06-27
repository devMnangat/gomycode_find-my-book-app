
export interface IRecommendation {
    userId: string;
    recommendedBooks: Array<{
      title: string;
      author: string;
      coverUrl?: string;
    }>;
    comment?: string;
  }
  