// Add User if not exits
// Add Cluster if not exits
// Add Relationschip if not exits
// Update the timestamps
MERGE (cluster:SYSTEM:CLUSTER:ABC {
  name: "MYCLUSTER"
  })
MERGE (user:SYSTEM:USER {
  name: "Dave",
  admin: true
  })
MERGE (user)-[rights:RIGHTS {canread:true, canwrite:true, candelete:true, admin:true}]->(cluster)
ON CREATE SET 
  cluster.uuid = randomUUID(), cluster.initialize = timestamp(), cluster.update = timestamp(),
  user.uuid = randomUUID(), user.initialize = timestamp(), user.update = timestamp(),
  rights.uuid = randomUUID(), rights.initialize = timestamp(), rights.update = timestamp()
ON MATCH SET 
  cluster.update = timestamp(), 
  user.update = timestamp(), 
  rights.update = timestamp()
RETURN user, cluster, rights


MERGE (cluster:SYSTEM:CLUSTER:ABC {
  name: "MYCLUSTER"
  })
MERGE (group:SYSTEM:GROUP:ABC {
  name: "ADMINS"
  })
MERGE (user:SYSTEM:USER {
  name: "Mike",
  admin: true
  })
MERGE (group)-[rights:RIGHTS {canread:true, canwrite:true, candelete:true, admin:true}]->(cluster)
MERGE (user)-[member:MEMBER]->(group)
ON CREATE SET 
  cluster.uuid = randomUUID(), cluster.initialize = timestamp(), cluster.update = timestamp(),
  user.uuid = randomUUID(), user.initialize = timestamp(), user.update = timestamp(),
  rights.uuid = randomUUID(), rights.initialize = timestamp(), rights.update = timestamp(),
  group.uuid = randomUUID(), group.initialize = timestamp(), group.update = timestamp()
ON MATCH SET 
  cluster.update = timestamp(), 
  user.update = timestamp(), 
  rights.update = timestamp(), 
  group.update = timestamp()
RETURN user, group, cluster, rights, member

// Add User if not exits
// Add Cluster if not exits
// Add Relationschip if not exits
// Update the timestamps
MERGE (cluster:SYSTEM:CLUSTER:ABC {
  name: "MYCLUSTER"
  })
MERGE (user:SYSTEM:USER {
  name: "Marcus",
  admin: false
  })
MERGE (user)-[rights:RIGHTS {canread:true, canwrite:true, candelete:true, admin:true}]->(cluster)
ON CREATE SET 
  cluster.uuid = randomUUID(), cluster.initialize = timestamp(), cluster.update = timestamp(),
  user.uuid = randomUUID(), user.initialize = timestamp(), user.update = timestamp(),
  rights.uuid = randomUUID(), rights.initialize = timestamp(), rights.update = timestamp()
ON MATCH SET 
  cluster.update = timestamp(), 
  user.update = timestamp(), 
  rights.update = timestamp()
RETURN user, cluster, rights


// Add Cluster if not exits
// Add Subluster if not exits
// Add Relationschip if not exits
// Update the timestamps
MERGE (cluster:SYSTEM:CLUSTER:ABC {
  name:"MYCLUSTER"
  })
MERGE (subcluster:SYSTEM:CLUSTER:WOA {
  name:"MYSUBCLUSTER"
  })
MERGE (cluster)-[sub:SUB {} ]-(subcluster)
ON CREATE SET 
  cluster.uuid = randomUUID(), cluster.initialize = timestamp(), cluster.update = timestamp(),
  subcluster.uuid = randomUUID(), subcluster.initialize = timestamp(), subcluster.update = timestamp(),
  sub.uuid = randomUUID(), sub.initialize = timestamp(), sub.update = timestamp()
ON MATCH SET 
  cluster.update = timestamp(),
  subcluster.update = timestamp(),
  sub.upadte = timestamp()
RETURN cluster, subcluster, sub

// Add User if not exits
// Add Cluster if not exits
// Add Relationschip if not exits
// Update the timestamps
MERGE (subcluster:SYSTEM:CLUSTER:WOA {
  name:"MYSUBCLUSTER"
  })
MERGE (user:SYSTEM:USER {
  name: "Peter",
  admin: false
  })
MERGE (user)-[rights:RIGHTS {canread:true, canwrite:true, candelete:true, admin:true}]->(subcluster)
ON CREATE SET 
  subcluster.uuid = randomUUID(), subcluster.initialize = timestamp(), subcluster.update = timestamp(),
  user.uuid = randomUUID(), user.initialize = timestamp(), user.update = timestamp(),
  rights.uuid = randomUUID(), rights.initialize = timestamp(), rights.update = timestamp()
ON MATCH SET 
  subcluster.update = timestamp(), 
  user.update = timestamp(), 
  rights.update = timestamp()
RETURN user, subcluster, rights

// Search User
// Delete User
MATCH (n:SYSTEM:USER)
WHERE n.firstName = "Peter"
SET n :DELETE
RETURN n


// Add User to Group
MERGE (cluster:SYSTEM:CLUSTER:ABC {
  name: "MYCLUSTER"
  })
MERGE (group:SYSTEM:GROUP:ABC {
  name: "ADMINS"
  })
MERGE (user:SYSTEM:USER {
  name: "Dave",
  admin: true
  })
MERGE (group)-[rights:RIGHTS {canread:true, canwrite:true, candelete:true, admin:true}]->(cluster)
MERGE (user)-[member:MEMBER]->(group)
ON CREATE SET 
  cluster.uuid = randomUUID(), cluster.initialize = timestamp(), cluster.update = timestamp(),
  user.uuid = randomUUID(), user.initialize = timestamp(), user.update = timestamp(),
  rights.uuid = randomUUID(), rights.initialize = timestamp(), rights.update = timestamp(),
  group.uuid = randomUUID(), group.initialize = timestamp(), group.update = timestamp()
ON MATCH SET 
  cluster.update = timestamp(), 
  user.update = timestamp(), 
  rights.update = timestamp(), 
  group.update = timestamp()
RETURN user, group, cluster, rights, member

// Remove old connections
MATCH (cluster:SYSTEM:CLUSTER:ABC {
  name: "MYCLUSTER"
  }), (user:SYSTEM:USER {
  name: "Dave",
  admin: true
  }), (user)-[rights:RIGHTS]->(cluster)
DELETE rights