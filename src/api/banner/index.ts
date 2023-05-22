import { map, Observable } from "rxjs";
import { Api } from "..";
import { getOriginFromUrl } from "../../common/url";

export interface BannerItem {
  image: string;
  title?: string;
}

interface GetBannerResponse {
  id: number;
  title: string;
  description: string;
  priority: number;
  isActive: boolean;
  shopId: number;
  imageName: string;
  mediumURL: string;
}
export const getBannerItems = (): Observable<BannerItem[]> => {
  const request: any = {};
  return new Api()
    .get<GetBannerResponse[]>("api/PolBannerApp/GetActiveBanners", {
      log: true,
      request,
    })
    .pipe(
      map((result: GetBannerResponse[]) => {
        const url = getOriginFromUrl(request.url);
        result.sort((a, b) => {
          return b.priority - a.priority;
        });
        return result.map((item) => {
          return {
            image: (url + "/" + item.mediumURL).replace("-thumbnail", ""),
            title: item.title,
          };
        });
      })
    );
};
