import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hooks";

export function LeagueTables() {
  const {loading,mostReviewsReceived,mostDespairReviewsGiven,mostDespairReviewsReceived,mostTrustworthyReviewsGiven,mostReviewsGiven,mostTrustworthyReviewsReceived } = useAppSelector((state) => state.reviews);

  const leagueData = [
    {
      category: "Users with most reviews received",
      data:mostReviewsReceived,
    },
    {
      category: "Users who've given most reviews",
      data:mostReviewsGiven,
    },
    {
      category: "Users who've received most Trustworthy reviews",
      data:mostTrustworthyReviewsReceived,
    },
    {
      category: "Users who've given most Trustworthy reviews",
      data:mostTrustworthyReviewsGiven,
    },
    {
      category: "Users who've received most Despair reviews",
      data:mostDespairReviewsReceived,
    },
    {
      category: "Users who've given most Despair reviews",
      data:mostDespairReviewsGiven,
    },
  ];

  const SkeletonLoader = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {leagueData.map((league) => (
        <Card key={league.category}>
          <CardHeader>
            <CardTitle>{league.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {league.data && league.data.length > 0 ? (
                  league.data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.pi_username}</TableCell>
                      <TableCell>{item.count}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

