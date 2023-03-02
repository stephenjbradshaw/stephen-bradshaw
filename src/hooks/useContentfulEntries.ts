import {Entry} from "contentful";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {contentfulClient} from "../utils/contentful";

const useContentfulEntries = <T>() => {
  const [data, setData] = useState<Entry<T>[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {i18n} = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const results = await contentfulClient.getEntries<T>({
          locale: i18n.resolvedLanguage,
        });
        const {items} = results;
        setData(items);
      } catch (err) {
        setIsError(true);
        console.log("Problem fetching from contentful", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [i18n.resolvedLanguage]);

  return {data, isError, isLoading};
};

export default useContentfulEntries;
