export default function FeaturesSection({image, alt, titre, description }) {
  return (
    <div className='feature-item'>
        <img src={image} alt={alt} className='feature-icon' />
        <h3 className="feature-item-title">{titre}</h3>
        <p>{description}</p>
    </div>
  )
}

