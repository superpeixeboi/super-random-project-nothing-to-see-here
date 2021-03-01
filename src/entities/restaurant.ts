import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import Cuisine from './cuisine'

@Entity({ name: 'restaurants' })
class Restaurant extends BaseEntity {
  constructor(init: Partial<Restaurant>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryColumn({ name: 'id' }) id: string
  @Column({ name: 'name' }) @IsNotEmpty() name: string
  @Column({ name: 'customer_rating' }) @IsNotEmpty() customerRating: number
  @Column({ name: 'distance' }) @IsNotEmpty() distance: number
  @Column({ name: 'price' }) @IsNotEmpty() price: number
  
  @Column({ name: 'cuisine_id' }) cuisineId: string


  @ManyToOne(() => Cuisine)
  @JoinColumn({ name: 'cuisine_id' })
  cuisine: Cuisine
}

export default Restaurant
