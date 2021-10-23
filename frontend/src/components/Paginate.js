import React from 'react'
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, pageNumber = 1, keywords = "", productAdmin = false, userAdmin = false, orderAdmin = false, userOrders = false }) => {
    return (
        <>
            {(!productAdmin && !userAdmin && !orderAdmin && !userOrders) && (
                <Pagination>
                    {[...Array(pages).keys()].map((x) => {
                        return <LinkContainer to={keywords === "" ? `/page/${x + 1}` : `/keywords/${keywords}/page/${x + 1}`}>
                            <Pagination.Item key={x + 1} active={x + 1 === pageNumber} value={x + 1}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    })}
                </Pagination>
            )}

            {productAdmin && (
                <Pagination>
                    {[...Array(pages).keys()].map((x) => {
                        return <LinkContainer to={`/admin/products/${x + 1}`}>
                            <Pagination.Item key={x + 1} active={x + 1 === pageNumber} value={x + 1}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    })}
                </Pagination>
            )}

            {userAdmin && (
                <Pagination>
                    {[...Array(pages).keys()].map((x) => {
                        return <LinkContainer to={`/admin/users/${x + 1}`}>
                            <Pagination.Item key={x + 1} active={x + 1 === pageNumber} value={x + 1}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    })}
                </Pagination>
            )}

            {orderAdmin && (
                <Pagination>
                    {[...Array(pages).keys()].map((x) => {
                        return <LinkContainer to={`/admin/orders/${x + 1}`}>
                            <Pagination.Item key={x + 1} active={x + 1 === pageNumber} value={x + 1}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    })}
                </Pagination>
            )}

            {userOrders && (
                <Pagination>
                    {[...Array(pages).keys()].map((x) => {
                        return <LinkContainer to={`/profile/${x + 1}`}>
                            <Pagination.Item key={x + 1} active={x + 1 === pageNumber} value={x + 1}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    })}
                </Pagination>
            )}
        </>
    )
}

export default Paginate
