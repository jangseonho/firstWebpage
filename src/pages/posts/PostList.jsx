import { Box, Paper, Typography } from '@mui/material'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import PostSearch from '../../components/posts/PostSearch';
import PostTable from '../../components/posts/PostTable';
import PostPagination from '../../components/posts/PostPagination';
import { useState } from 'react';
import { fetchPosts } from '../../api/postsApi';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useMe } from '../../hooks/useMe';

function PostList() {
    // 현재 페이지 상태
    const [page, setPage] = useState(0);
    // 키워드 상태
    const [keyword, setKeyword] = useState('');

    // 조회 Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts', page, keyword],
        queryFn: () => fetchPosts({ page, size: 10, keyword }),
        placeholderData: keepPreviousData // 페이지 전환시 기존 데이터 유지. 화면에 빈 화면이 생기지 않음.
    });

    const { data: me, isLoading: meIsLoading } = useMe();

    if (isLoading) return <Loader />
    if (isError) return <ErrorMessage />

    const { content, totalPages } = data;

    // ❤️ 이벤트 핸들러 모음집 ❤️
    // 검색
    const handleSearch = (evt) => {
        evt.preventDeafalut();
        setPage(0);
    }

    // 페이지 이동
    const handlePrev = () => {
        setPage((prev) => Math.max(prev - 1, 0));
    }
    const handleNext = () => {
        setPage((prev) => prev + 1 < totalPages ? prev + 1 : prev);
    }

    return (
        <Box>
            <Paper elevation={1}
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    p: 4,
                    boxShadow: '0, 16px, 45px, rgba(177, 176, 176, 0.06)' // x축 y축 번짐 색상(rgba alpha 투명도 0~1)
                }}>
                <Box>
                    {/* 상단 제목 */}
                    <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 3 }}>게시글 목록</Typography>

                    {/* 검색 */}
                    <PostSearch
                        keyword={keyword}
                        onChangeKeyword={setKeyword}
                        onSubmit={handleSearch} />

                    {/* 테이블 */}
                    <PostTable posts={content} />

                    {/* 페이지네이션 */}
                    <PostPagination
                        page={page}
                        totalPages={totalPages}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        logined={!meIsLoading && !!me}
                    />

                </Box>
            </Paper>
        </Box>
    );
}

export default PostList;