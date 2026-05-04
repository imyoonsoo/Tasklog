export function SearchNoResult() {
  return (
    <div className="text-black-500 m-auto flex flex-col gap-2 pt-25">
      <div className="text-2xl font-semibold">검색 결과가 없습니다. </div>
      <div className="m-auto">다른 검색어를 사용해주세요.</div>
    </div>
  );
}
