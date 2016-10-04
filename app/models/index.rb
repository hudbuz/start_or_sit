class Index < ApplicationRecord


  def self.set_index(index_pairs)  
    index_pairs['stats'].each do |stat|
      self.create(name: stat['name'])
    end
  end
end
