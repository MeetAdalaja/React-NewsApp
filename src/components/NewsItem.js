import React from 'react'

const NewsItem = (props) => {


    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (

        <div className='my-3'>
            <div className="card">
                <img src={imageUrl ? imageUrl : "https://gdb.voanews.com/01000000-0aff-0242-ca4b-08db110d1940_cx0_cy5_cw0_w1200_r1.png"} className="card-img-top" alt="img" />
                <div className="card-body">
                    <h5 className="card-title">{title}<span className="position-absolute translate-middle badge bg-warning" style={{ top: 0, right: 0 }}> {source} </span></h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "UnKnown"} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn bgn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}


export default NewsItem


// 1e3c373bc5f6448f84575debc51a9310

