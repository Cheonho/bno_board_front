import { useEffect, useState } from "react";

const usePagination = <T>(countPerPage: number) => {
  const [totalList, setTotalList] = useState<T[]>([]);
  const [viewList, setViewList] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPageList, setTotalPageList] = useState<number[]>([1]);
  const [viewPageList, setViewPageList] = useState<number[]>([1]);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [totalSection, setTotalSection] = useState<number>(1);

  // const [countPerPage, setCountPerPage] = useState<number>(5);

  const setView = () => {
    const FIRST_INDEX = countPerPage * (currentPage - 1);
    const LAST_INDEX = totalList.length > countPerPage * currentPage ? countPerPage * currentPage : totalList.length;
    const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX)
    setViewList(viewList);
  }

  const setViewPage = () => {
    const FIRST_INDEX = 10 * (currentSection - 1);
    const LAST_INDEX = totalPageList.length > 10 * currentSection ? 10 * currentSection : totalPageList.length;
    const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
    setViewPageList(viewPageList)
  }

  useEffect(() => {
    const totalPage = Math.ceil(totalList.length / countPerPage)
    const totalSection = Math.ceil(totalList.length / (countPerPage * 10))
    const totalPageList = [];

    for (let page = 1; page <= totalPage; page++) totalPageList.push(page);
    // setTotalPageList(totalPageList);
    // setTotalSection(totalSection);

    setView();
    setViewPage();
  }, [totalList, totalPageList])

  useEffect(() => {
    setCurrentPage(1);
    setCurrentSection(1);
  }, [totalList])

  useEffect(setView, [currentPage])
  useEffect(setViewPage, [currentPage])

  return {
    currentPage,
    setCurrentPage,
    currentSection,
    setCurrentSection,
    viewList,
    viewPageList,
    totalSection,
    setTotalList
  };
};

export default usePagination;