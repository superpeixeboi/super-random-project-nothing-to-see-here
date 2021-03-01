import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'cuisines' })
class Cuisine extends BaseEntity {
  constructor(init: Partial<Cuisine>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryColumn({ name: 'id' }) id: string
  @Column({ name: 'name' }) @IsNotEmpty() name: string
}

export default Cuisine
