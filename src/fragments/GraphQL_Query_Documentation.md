# GraphQL API for ConsenSys Labs [Master Spoke Database](https://airtable.com/tbloAonZGLjkSBwXl/viwKebQe21JfRoSdm)


# Fragments
Fragments are reusable pieces of code for GraphQL queries that allow you access fields on data objects.
They are used to split data requirements into smaller chunks, especially when you need to combine them in lots of UI components.

### BasicSpokeInformation
```
  fragment BasicSpokeInformation on SpokeDatabase {
    data {
      Name
      Description
      Website
    }
  }
```

### FullContainerImage
```
  fragment FullContainerImage on ImageSharp {
    fluid(maxWidth: 1170) {
      ...GatsbyImageSharpFluid
    }
  }
```


# Queries

### `getAllSpokes` from "Projects" table

```
query getAllSpokes {
  allSpokeDatabase {
    edges {
      node {
        data {

          Name: String
          FKA: String
          Public: Boolean
          Description: String
          Creation_Date: String
          Type: String
          Stage: String
          Website: String
          Github: String

          Leads: String[]
          Lead_Email_Address: String
          Labs_Contact_Person: String

          Location: String
          Headcount: Int
          Lifetime_Spend: String

        }
      }
    }
  }
}
```

### `getSpokeData` from "Projects" table

```
query getSpokeData(
  $spokeName: String!
) {
  spokeDatabase(
    data: {Spoke: {eq: $spokeName}}
  ) {
    data {

      Name
      FKA
      Description
      Creation_Date
      Type
      Stage
      Website
      Github

      Leads
      Lead_Email_Address
      Labs_Contact_Person

      Location
      Headcount
      Lifetime_Spend

    }
  }
}
```

### `getValidSpokes` from "Projects" table

```
query getValidSpokes {

  spokes:
    allSpokeDatabase (
      filter: {
          data: {
            Type: { eq: "Spoke" }
            Public: { eq: true }
          }
        }
    ) {
       edges {
        node {
          data {
            Stage
          }
        }
      }
    }

  spunOut:
    allSpokeDatabase (
      filter: {
        data: {
          Type: { eq: "Spun-out/Alumni" }
          Public: { eq: true }
        }
      }
    ) {
      edges {
        node {
          data {
            Stage
          }
        }
      }
    }
}
```

### `getInvestorUpdates` from "Investor Updates" table

```
query getInvestorUpdates(
  $spokeName: String!
) {
  investorUpdate(
    data: {Project: {eq: $spokeName}}
  ) {
    data {

      Project
      Headcount
      Date      
      
      Goals
      Accomplishments
      Non_Revenue_Traction
      Product_Roadmap
      Obstacles
      
      
      Other_Notes
      _6_Month_Milestons
      Last_Month_Assessment
      Submitted_By
      Labs_NPS

    }
  }
}
```

### `getSpokeMetrics` from "Performance Metrics" table
```
query getSpokeMetrics( $spokeName: String! ) {
  allSpokeMetric (
    filter: { data: { Project: { eq: $spokeName }}}
    sort: {fields: data___Date}
  ) {
    edges {
      node {
        data {
          Project
          Metric
          Value
          Date
        }
      }
    }
  }
}
```


# Cross Linking Tables
Can not filter or utilizize data from columns that are deep linking in Airtable. So in order to filter spokes by their name you can't do it in GraphQL it must be dont in JS, this is not a problem for how we are going to be making the spoke pages but could be a problem in other instances. So using allInvestorUpdate for instance and then mapping over

### `getSpokeInvestorData` from "Investor Updates" table
```
query investorUpdate ( $SpokeName: String! ) {
  allInvestorUpdate (
    filter: { 
      data: { 
        Project: { 
          elemMatch: {  // querying on deep linked columns requires extra digging
            data: { 
              Name: {
                eq: $SpokeName
              }
            }
          } 
        }
      }
    }
  )  {
    edges {
      node {
        data {
          Project {
            data {
              Name
            }
          }
          Non_Revenue_Traction
          Last_Month_Assessment
          Headcount
        }
      }
    }
  }
}
```